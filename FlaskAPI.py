
from flask import Flask,request,jsonify
from flask_mysqldb import MySQL
import re
import string
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
 


def find_rows(input,list):

    for i in range(len(list)):
        if input == list[i]['item_url']:
            return i,list[i]
    return False


# Create an instance
app = Flask(__name__)

# MySQL database 
app.config['MYSQL_USER']="root"
app.config['MYSQL_PASSWORD']="MyNewPass"
app.config['MYSQL_DB']="mydb"

mysql=MySQL(app)

@app.route('/main',methods=['GET','POST']) 

def main_page():
    cur=mysql.connection.cursor()
    products=cur.execute("SELECT * FROM mydb.products")
    products= list(cur.fetchall())
    products_dict=[dict(zip(('item_id', 'item_name', 'item_rating', 'ratings_num', 'item_sold', 'shop_name', 'item_url', 'item_description', 'item_price','accu_score','item_image'), tpl)) for tpl in products]
    
    print(products_dict)
    return jsonify({'prodList':products_dict})


def recommend_items(item, indexing, desc_similarity_matrix, name_similarity_matrix,df):

    item_index = indexing[item]

    # Get similarity values with other items based on name and desc
    desc_similarity_score = list(enumerate(desc_similarity_matrix[item_index]))
    name_similarity_score = list(enumerate(name_similarity_matrix[item_index]))
   
  
    # Combine the similarity scores from both matrices
    combined_similarity_score = [(i, desc_similarity_score[i][1] + name_similarity_score[i][1]) for i in range(len(desc_similarity_score))]

    # Sort the combined similarity scores in descending order
    combined_similarity_score = sorted(combined_similarity_score, key=lambda x: x[1], reverse=True)

    # Get the scores of the 10 most similar items. Ignore the first item.
    top_combined_similarity_score = combined_similarity_score[1:10]

    # Get items id based on the mapping series
    similarities = [i[0] for i in top_combined_similarity_score]
    similar_products = df.iloc[similarities]
    
    similar_products=similar_products.sort_values(by='accu_score', ascending=False)
    best_product=similar_products[0:5]
    best_product= best_product.to_dict(orient='records')

    return best_product

listing_list=[]
similar_product_list=[]

@app.route('/input',methods=['GET','POST']) 

def input ():
    
    cur=mysql.connection.cursor()
    products=cur.execute("SELECT * FROM mydb.products")
    products= list(cur.fetchall())
    products_dict=[dict(zip(('item_id', 'item_name', 'item_rating', 'ratings_num', 'item_sold', 'shop_name', 'item_url', 'item_description', 'item_price','accu_score','item_image'), tpl)) for tpl in products]
    
    
    df=pd.DataFrame(products_dict)
    
    # encoding
    tfidf=TfidfVectorizer(stop_words='english')
    
    #Construct the required TF-IDF matrix by applying the fit_transform method on the overview feature
    desc_matrix = tfidf.fit_transform(df['item_description'])
    name_matrix = tfidf.fit_transform(df['item_name'])
    
    desc_similarity_matrix = cosine_similarity(desc_matrix,desc_matrix)
    name_similarity_matrix = cosine_similarity(name_matrix,name_matrix)
    
    indexing = pd.Series(df.index,index = df['item_url'])

    df=pd.DataFrame(products_dict)

    if request.method =='POST':
        input_data = request.json["inputData"]
        
        listing=find_rows(input_data, products_dict)


        '''if(listing==False):
            print("Item not found")
        else: '''
        item_result=listing[1]
        index=listing[0]
        item_result['item_rating']=float(item_result['item_rating'])
        item_result['ratings_num']=int(item_result['ratings_num'])
        item_result['item_sold']=int(item_result['item_sold'])
        item_result['accu_score']=float(item_result['accu_score'])
        
        best_product=recommend_items(df.loc[index,'item_url'], indexing, desc_similarity_matrix, name_similarity_matrix,df)
        print(item_result)
        print(best_product)
        
        listing_list.append(item_result)
        similar_product_list.append(best_product)
        
        

    return jsonify({'message': 'Invalid request'})  

@app.route('/result', methods=['GET'])
def result():
    # Get the processed items from the backend or any other data source
    item_result = [listing_list[0]]
    best_product = similar_product_list[0]
    
    listing_list.clear()
    similar_product_list.clear()
    
    # Return the item_result and best_product as JSON response
    return jsonify({'item_result': item_result, 'best_product': best_product})
    
if __name__ == "__main__":
    app.run(debug=True)
