import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col, Button, InputGroup, FormControl, Card, Badge } from "react-bootstrap";

function App() {
  // GitHub repository URL - Replace with your actual GitHub URL
  
  const [userInput, setUserInput] = useState("");
  const [list, setList] = useState([
    { id: 1, value: "Learn React", priority: "high" },
    { id: 2, value: "Build a todo app", priority: "medium" },
    { id: 3, value: "Deploy to production", priority: "low" },
  ]);

  // Update input value
  const updateInput = (value) => {
    setUserInput(value);
  };

  // Add item if input isn't empty
  const addItem = () => {
    if (userInput.trim() !== "") {
      const newItem = {
        id: Math.random(),
        value: userInput,
        priority: "medium", // Default priority
      };
      
      setList([...list, newItem]);
      setUserInput("");
    }
  };

  // Delete item from list
  const deleteItem = (id) => {
    const updatedList = list.filter((item) => item.id !== id);
    setList(updatedList);
  };

  // Edit item in list
  const editItem = (index) => {
    const editedTodo = prompt("Edit the todo:", list[index].value);
    if (editedTodo !== null && editedTodo.trim() !== "") {
      const updatedList = [...list];
      updatedList[index].value = editedTodo;
      setList(updatedList);
    }
  };

  // Toggle priority
  const togglePriority = (index) => {
    const priorities = ["low", "medium", "high"];
    const updatedList = [...list];
    const currentPriority = updatedList[index].priority;
    const currentIndex = priorities.indexOf(currentPriority);
    const nextIndex = (currentIndex + 1) % priorities.length;
    
    updatedList[index].priority = priorities[nextIndex];
    setList(updatedList);
  };

  // Get priority badge color
  const getPriorityColor = (priority) => {
    switch(priority) {
      case "high": return "danger";
      case "medium": return "warning";
      case "low": return "info";
      default: return "secondary";
    }
  };

  return (
    <div className="min-vh-100 py-5" style={{ backgroundColor: "#f8f9fa" }}>
      <Container>
        {/* Header */}
        <Row className="mb-5 text-center">
          <Col>
            <h1 className="display-4 fw-bold text-primary">Task Master</h1>
            <p className="text-muted">Keep track of your daily tasks</p>
            <a 
              href="https://github.com/lilobaje/todo-list" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-sm btn-outline-secondary mt-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github me-1" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.7-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              Get the code on GitHub
            </a>
          </Col>
        </Row>

        {/* Input Group */}
        <Row className="justify-content-center mb-4">
          <Col md={8} lg={6}>
            <InputGroup className="shadow-sm">
              <FormControl
                placeholder="What needs to be done?"
                value={userInput}
                onChange={(e) => updateInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addItem()}
                className="py-2 border-end-0"
              />
              <Button 
                variant="primary" 
                onClick={addItem}
                className="px-4"
              >
                Add Task
              </Button>
            </InputGroup>
          </Col>
        </Row>

        {/* Task Counter */}
        <Row className="justify-content-center mb-3">
          <Col md={8} lg={6} className="d-flex justify-content-between">
            <p className="text-muted mb-0">
              {list.length} {list.length === 1 ? 'task' : 'tasks'} remaining
            </p>
            <Button 
              variant="link" 
              className="text-danger p-0"
              onClick={() => setList([])}
              disabled={list.length === 0}
            >
              Clear all
            </Button>
          </Col>
        </Row>

        {/* Todo List */}
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            {list.length === 0 ? (
              <Card className="text-center p-5 shadow-sm border-0">
                <p className="text-muted mb-0">Your task list is empty</p>
              </Card>
            ) : (
              list.map((item, index) => (
                <Card 
                  key={index} 
                  className="mb-3 shadow-sm border-0"
                >
                  <Card.Body className="d-flex justify-content-between align-items-center p-3">
                    <div className="d-flex align-items-center">
                      <Badge 
                        bg={getPriorityColor(item.priority)}
                        className="me-3 px-2 py-1 cursor-pointer"
                        onClick={() => togglePriority(index)}
                        style={{ cursor: 'pointer' }}
                      >
                        {item.priority}
                      </Badge>
                      <span>{item.value}</span>
                    </div>
                    <div>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="me-2"
                        onClick={() => editItem(index)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => deleteItem(item.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;