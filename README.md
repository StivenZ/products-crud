<p align="center">
  <img src="https://lh3.googleusercontent.com/v--plqz3UIskeOZI5o1sfoyA6MLUEHSZh21jnRdF_fCj2J4umfwuOszibDzCNSiahRctHtiRskwJVjTskmY3AWWf6gYh06kKmhKZhX4NVQqxMERjGwA9CLFbzZqESWDrQ_g7DBPdeA=w2400" >
</p>

<h1 align="center">Products CRUD</h1>
<p align="center">Backed</p>

---
## Description

Products CRUD exposes an API to perform the basic operations. The backend was built using serverless framework, javascript, and was deployed using the aws free tier services: API gateway and AWS lambda.

## Endpoints :end:

Product CRUD uses the following resources:
|     | route | method | description |
| --- | ----- | ------ | ----------- |
| **/dev/products** | GET | retrieves all the products in the database |
| **/dev/products/:id** | GET | retrieves a specific product based on its id |
| **/dev/products** | POST | creates a new product object and saves it on the database | information with the parameters to create the object must be passed in the body of the request |
| **/dev/products/:id** | PUT | updates the object whose id is passed through the request parameters | 
| **/dev/products/:id** | DELETE | removes the object from the database |

## Getting started

First clone this repo locally:
```bash
git clone https://github.com/StivenZ/products-crud.git
```

Install Products CRUD using npm as follows:

```bash
npm install
```

Then install serverless offline to see how would the app actually work before deploying:
```bash
npm i --save-dev serverless-offline
```

Once everything is installed, proceed to run the app:
```bash
sls offline start --skipCacheInvalidation
```

Now the app can be tested using any HTTP request tester. In this case, it can be tested using the `curl` command.

#### get requests
To retrieve all objects stored:
```bash
curl http://localhost:3000/dev/products
```
To retrieve a specific object based on its id:
```bash
curl http://localhost:3000/dev/products/{id}   # replace {id} with the id of any object retrieved before
```

#### Put requests
To create a new product object, an object must be passed with this format:
```js
{
    "name": "",
    "descripcion": "",
    "categoria": "",
    "precio": "",
    "cantidad": "",
}
```

with curl:
```bash
curl -d '{"nombre": "NAME", "descripcion": "DESC", "categoria": "CAT", "precio": 5, "cantidad": 5}' -H "Content-Type: application/json" -X POST http://localhost:3000/dev/products
```
Capitalized values should be replaced with proper values to create the product object. List using the first get method to check the new object.

#### Put requests
To update an existing product object, use the body format from before with the params to change, and pass in the url the id of the object to modify:
```bash
curl -d '{"nombre": "NAME", "descripcion": "DESC", "categoria": "CAT", "precio": 5, "cantidad": 5}' -H "Content-Type: application/json" -X PUT http://localhost:3000/dev/products/{id}
```
replace `{id}` with the id of the product object to update.


#### Delete requests
To delete an existing product object, just pass in the url the id of the object to remove:
```bash
curl -X DELETE http://localhost:3000/dev/products/{id}
```
replace `{id}` with the id of the product object to delete.


## Testing :straight_ruler:

Unittests for the app are defined in the `/__tests__` folder. To run the entire test suite simultaneously, execute the following command:

```bash
npm run test
```

the complete service can be fount at:

http://simplecrudtest.s3-website-sa-east-1.amazonaws.com/

Once open, product objects can be created using the input on the right, and can be updated or deleted using the items at the left.

## Authors :black_nib:
* **Steven Espinosa** <[StivenZ](https://github.com/)>
