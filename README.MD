# airQI

*Project #2 / Full-stack Application*

### **INSTALLATION**

- HTML
- CSS
- Javascript
- Express
- Liquid
- Mongoose
- Bcrypt
- Morgan
- Axios
___
### **API SOURCES**
Weather API

https://www.weatherapi.com/docs/

___
### **USER STORY**

As a user who is concerned about the outdoor air quality, I want access to my local enviromental conditions in realtime and to be able to save it to a journal that I can edit and add my own notes to. 
___
### **GOAL STATEMENT**

The airQI app allows the users to search the air quality in real time and save the data to their journals. The user is able to add their own imput whether from their own personal sensors or just notes and thoughts for each saved post. The user is able to create a porfile that and get access to their saved searches. 

___
### **ENTITY-RELATIONSHIP DIAGRAM**

![models](readme-images/erd.jpg)

___
### **WIREFRAMES**

![wire frames](readme-images/wireframes.jpg)

## Tasks

This template uses `npm` as a task runner. 
These are the commands available:

| Command                | Effect                                                                                                      |
|------------------------|-------------------------------------------------------------------------------------------------------------|
| `npm start`       | Starts a development server with `nodemon` that automatically refreshes when you change something.                                                                                         |

## Documenting

Use this as the basis for your own documentation. Add a new third-level heading for your custom entities, and follow the pattern provided for the built-in user authentication documentation.


### Authentication

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/auth/signup`             | `users#signup`    |
| POST   | `/auth/login`             | `users#login`    |
| DELETE | `/auth/logout/`        | `users#logout`   |

### Error Handling

Errors are handled with a default view, and should be called as seen in this example:
```js
router.delete('/:id', (req, res) => {
	const exampleId = req.params.id
	Example.findByIdAndRemove(exampleId)
		.then(example => {
			res.redirect('/examples')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})
```