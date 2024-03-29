import React, {useState} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Dropdown from 'react-bootstrap/Dropdown'
import './index.scss'

// file obtained by: curl https://jsonplaceholder.typicode.com/posts > posts.json
import posts from '../../data/posts.json'

const categories = ['category1', 'category2', 'category3', 'category4'];

const somePosts = posts.slice(0, 8).map(post => {
    return {...post, category: categories[Math.floor(Math.random() * 4)]}
});

const Posts = () => {
    const [postList] = useState(somePosts);
    const [categoryList] = useState(categories);
    const [selectedCategory, setCategory] = useState("");
    const [textLength, setTextLength] = useState(80);

    const handleOptionChange = changeEvent => {
        setCategory(changeEvent.target.value);
    };

    const handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();
        setCategory("");
    };

    const handleTextLength = textLengthEvent => {
        setTextLength(textLengthEvent);
    };

    const thePosts = postList.map(post => {
        if (selectedCategory === "" || selectedCategory === post.category) {
            return <ListGroup.Item
                key={post.id}
                variant="flush">
                <h5>{post.title}</h5>
                {post.body.substr(0, textLength) + '...'}
                <p><small><strong>{post.category}</strong></small></p>
            </ListGroup.Item>
        } else {
            return null;
        }
    });

    const theCategoryOptions = categoryList.map((category, i) => {
        return <div className="form-check" key={i}>
            <label>
                <input
                    type="radio"
                    name="react-tips"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={handleOptionChange}
                    className="form-check-input"
                />
                {category}
            </label>
        </div>
    });
    return (
        <>
            <Container className="Filter mb-4">
                <Row>
                    <Col className="mt-4 p-4" sm={12}>
                        <Card>
                            <Card.Title className="px-4 pt-4 pb-0">Filter by Post category</Card.Title>
                            <Card.Body>
                                <form onSubmit={handleFormSubmit}>
                                    {theCategoryOptions}
                                    <div className="form-group">
                                        <div>Show posts with selected category</div>
                                        <button className="btn btn-primary mt-2" type="submit">
                                            Clear Selection
                                        </button>
                                    </div>
                                </form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Container className="Posts">
                <Row>
                    <Col sm={12}>
                        <Card>
                            <Card.Title>Posts <small>(text length: {textLength})</small></Card.Title>
                            <Dropdown onSelect={handleTextLength} className="mx-2 mb-2">
                                <Dropdown.Toggle  className={"mx-2"} variant={"primary"} id={"post-text-length"}>
                                    Set Text Length
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey={40}>40 Chars</Dropdown.Item>
                                    <Dropdown.Item eventKey={80}>80 Chars</Dropdown.Item>
                                    <Dropdown.Item eventKey={120}>120 Chars</Dropdown.Item>
                                    <Dropdown.Item eventKey={160}>160 Chars</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <ListGroup>
                                {thePosts}
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )

};

export default Posts
