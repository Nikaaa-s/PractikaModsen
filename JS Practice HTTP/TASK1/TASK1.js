// GET BY ID
//Тип_запроса: GET
//URL: /api/v1/notes/:noteId
//Принимает: id заметки
//Успех: 200 + id || title || content
//Провал: NotFound(); 404

// GET ALL
//Тип_запроса: GET
//URL: /api/v1/notes
//Принимает: ?
//Успех: 200 +  json файл струтуры: id || title || content
//Провал: NotFound(); 404

// CREATE
//Тип_запроса: POST
//URL: /api/v1/notes
//Принимает: json файл струтуры: title || content и задает id
//Успех: 201 и id
//Провал: BadRequest(); 400

// EDIT
//Тип_запроса: PUT
//URL: /api/v1/notes/:nodeId
//Принимает: id заметки
//Успех: 201
//Провал: BadRequest(); 400

// DELETE
//Тип_запроса: DELETE
//URL: /api/v1/notes/nodeId
//Принимает: id заметки
//Успех: NoContent(); 204
//Провал: BadRequest(); 400 || NotFound(); 404