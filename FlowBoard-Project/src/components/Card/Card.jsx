import { MdOutlineChecklistRtl } from "react-icons/md";
import { MdDeleteSweep } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import './card.css';

function Card({ image, title, description, onDelete, onEdit }) {
    return (
        <div className="card">
            {image && <img src={image} alt={title} className="card-image" />}

            <h4 className="card-title">
                {title}
                <MdOutlineChecklistRtl className="card-icon checklist-icon" />
            </h4>

            <p className="card-description">{description}</p>

            <div className="card-actions">
                <FaEdit className="card-icon edit-icon" onClick={onEdit} />
                <MdDeleteSweep className="card-icon delete-icon" onClick={onDelete} />
            </div>
        </div>
    );
}

export default Card;