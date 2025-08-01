
import { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext } from 'react-beautiful-dnd';
import Header from './Header';
import ListBacklog from './ListBacklog';
import ListInProgress from './ListInProgress';
import ListInTesting from './ListInTesting';
import ListDone from './ListDone';
import '../css/Board.css';

function Board() {
    // Tüm kartları tek bir merkez
    const [allCards, setAllCards] = useState([
        {
            id: "1",
            title: "Login Page Design",
            description: "Preparations for designing a modern and user-friendly login interface will begin soon.",
            status: "backlog"
        },
        {
            id: "2",
            title: "Create Registration Form",
            description: "A registration form that allows users to sign up easily is being planned; development will start shortly.",
            status: "backlog"
        },
        {
            id: "3",
            title: "Dark Mode Design",
            description: "Work is actively underway on the dark mode feature, aiming to deliver a sleek theme that enhances user experience.",
            status: "in-progress"
        },
        {
            id: "4",
            title: "Connect To API",
            description: "API connections are being established to enable seamless data exchange; integration is in progress.",
            status: "in-progress"
        },
        {
            id: "5",
            title: "Create Database Schema",
            description: "The database schema defining the application's data structure has been successfully created and is ready for use.",
            status: "done"
        },
        {
            id: "6",
            title: "Make Navbar Responsive",
            description: "The navigation bar has been optimized to work smoothly across all devices, ensuring full mobile responsiveness.",
            status: "done"
        },
        {
            id: "7",
            title: "Form Validation Test",
            description: "Validation rules for form fields are being tested to prevent user errors and ensure proper input handling.",
            status: "in-testing"
        },
        {
            id: "8",
            title: "Mobile Compatibility Test",
            description: "Comprehensive testing is being conducted to ensure the application performs flawlessly on various mobile devices.",
            status: "in-testing"
        }
    ]);


    const listIds = {
        'backlog': ["1", "2"],
        'in-progress': ["3", "4"],
        'in-testing': ["7", "8"],
        'done': ["5", "6"]
    };

    useEffect(() => {
        axios.get('http://localhost:3000/data')
            .then(response => {
                setAllCards(response.data); // Tüm veriyi state
            })
            .catch(error => {
                console.error("Veri çekme hatası:", error);
            });
    }, []);


    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result;


        if (!destination) {
            return;
        }


        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const startListId = source.droppableId;
        const finishListId = destination.droppableId;
        const movedCard = allCards.find(card => card.id === draggableId);

        if (!movedCard) return;

        let newAllCards = Array.from(allCards);

        newAllCards = newAllCards.filter(card => card.id !== draggableId);

        let targetCards = newAllCards.filter(card => listIds[finishListId].includes(card.id));


        const updatedListIds = { ...listIds };


        updatedListIds[startListId] = updatedListIds[startListId].filter(id => id !== draggableId);

        const currentCard = allCards.find(card => card.id === draggableId);
        if (!currentCard) return;


        const startCards = allCards.filter(card => card.status === startListId);
        const finishCards = allCards.filter(card => card.status === finishListId);

        if (source.droppableId === destination.droppableId) {

            const reordered = Array.from(startCards);
            const [removed] = reordered.splice(source.index, 1);
            reordered.splice(destination.index, 0, removed);

            setAllCards(prevAllCards =>
                prevAllCards.map(card => {
                    const foundInReordered = reordered.find(rcard => rcard.id === card.id);
                    if (foundInReordered) {

                        return foundInReordered;
                    }
                    return card;
                })
            );
        } else {

            const newStartCards = Array.from(startCards);
            const [moved] = newStartCards.splice(source.index, 1);

            const newFinishCards = Array.from(finishCards);

            newFinishCards.splice(destination.index, 0, { ...moved, status: finishListId });


            const updatedAllCards = allCards.map(card => {
                if (card.id === draggableId) {
                    return { ...card, status: finishListId };
                }
                return card;
            });
            setAllCards(updatedAllCards);

        }
    };

    return (
        <div className="board">
            <Header />

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="list-container">
                    <ListBacklog
                        cards={allCards.filter(card => card.status === 'backlog')}
                        listId="backlog"
                    />
                    <ListInProgress
                        cards={allCards.filter(card => card.status === 'in-progress')}
                        listId="in-progress"
                    />
                    <ListInTesting
                        cards={allCards.filter(card => card.status === 'in-testing')}
                        listId="in-testing"
                    />
                    <ListDone
                        cards={allCards.filter(card => card.status === 'done')}
                        listId="done"
                    />
                </div>
            </DragDropContext>
        </div>
    );
}

export default Board;