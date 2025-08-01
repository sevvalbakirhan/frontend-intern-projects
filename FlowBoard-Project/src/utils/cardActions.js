
import axios from 'axios';

// Tüm kartları yöneten setAllCards'ı prop olarak alacak
export const deleteCardById = async (id, setAllCards) => {
    try {
        await axios.delete(`http://localhost:3000/data/${id}`);
        setAllCards(prevCards => prevCards.filter(card => card.id !== id));
        alert('Card deleted successfully!');
    } catch (error) {
        console.error("Error deleting card:", error);
        alert('Error deleting card.');
    }
};


export const updateCardById = async (id, title, description, setAllCards, resetEditState) => {
    try {
        const updatedCard = { title, description };

        const currentCardsResponse = await axios.get(`http://localhost:3000/data/${id}`);
        const currentCard = currentCardsResponse.data;

        const finalUpdatedCard = { ...currentCard, ...updatedCard };

        await axios.put(`http://localhost:3000/data/${id}`, finalUpdatedCard);

        setAllCards(prevCards =>
            prevCards.map(card =>
                card.id === id ? { ...card, title, description } : card
            )
        );
        alert('Card updated successfully!');
        resetEditState();
    } catch (error) {
        console.error("Error updating card:", error);
        alert('Error updating card.');
    }
};