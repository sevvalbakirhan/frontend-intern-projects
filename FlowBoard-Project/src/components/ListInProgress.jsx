import React, { useState } from 'react';
import Card from './Card/Card';
import SectionCard from './SectionCard/SectionCard';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { deleteCardById, updateCardById } from '../utils/cardActions';
import '../css/ListInProgress.css';

function ListInProgress({ cards, listId, setAllCards }) {
    const [editModeId, setEditModeId] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedDescription, setEditedDescription] = useState("");

    const resetEditState = () => {
        setEditModeId(null);
        setEditedTitle("");
        setEditedDescription("");
    };

    const handleDelete = (id) => {
        deleteCardById(id, setAllCards);
    };

    const handleEdit = (id, title, description) => {
        setEditModeId(id);
        setEditedTitle(title);
        setEditedDescription(description);
    };

    const handleUpdate = (id) => {
        updateCardById(id, editedTitle, editedDescription, setAllCards, resetEditState);
    };

    return (
        <SectionCard title="In Progress" imageSrc="inprogress.jpg">
            <Droppable droppableId={listId} isCombineEnabled={false}>
                {(provided, snapshot) => (
                    <div
                        className={`list-cards ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {cards.map((card, index) => (
                            <Draggable key={card.id} draggableId={card.id} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={`draggable-card ${snapshot.isDragging ? 'dragging' : ''}`}
                                    >
                                        {editModeId === card.id ? (
                                            <div className="edit-form">
                                                <input
                                                    type="text"
                                                    value={editedTitle}
                                                    onChange={(e) => setEditedTitle(e.target.value)}
                                                    placeholder="Edit title"
                                                />
                                                <textarea
                                                    value={editedDescription}
                                                    onChange={(e) => setEditedDescription(e.target.value)}
                                                    placeholder="Edit description"
                                                />
                                                <button onClick={() => handleUpdate(card.id)}>Save</button>
                                                <button onClick={resetEditState}>Cancel</button>
                                            </div>
                                        ) : (
                                            <Card
                                                title={card.title}
                                                description={card.description}
                                                image={card.image}
                                                onDelete={() => handleDelete(card.id)}
                                                onEdit={() => handleEdit(card.id, card.title, card.description)}
                                            />
                                        )}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </SectionCard>
    );
}

export default ListInProgress;