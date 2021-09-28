import '../assets/styles/components/CharacterCard.css';
import unknowCharacterImage from '../assets/static/unknow-character.png';

function CharacterCard({ name="Unknow", status="Unknow", origin={name:"Unknow"}, image=unknowCharacterImage, isFavorite, wasListed, handleClick }) {

    let statusColor;
    switch (status) {
        case 'Alive':
            statusColor = 'green';
            break;
        case 'Dead':
            statusColor = 'red';
            break;
        default:
            statusColor = 'gray';
            break;
    }


    return (
        <div className={`character-card card-${statusColor}`}>
            <img className="character-card-img" src={image} alt='Imagen' />
            <div className="character-card-details">
                {
                    wasListed
                        ?
                        ""
                        :
                        isFavorite
                            ?
                            (
                                <button type='button' className='character-card-details-remove-favorite-button' onClick={handleClick} />
                            )
                            :
                            (
                                <button type='button' className='character-card-details-add-favorite-button' onClick={handleClick} />
                            )
                }
                <p className="character-card-details-title">{name}</p>
                <p className="character-card-details-subtitle">{origin.name}</p>
                <p className={`character-card-details-subtitle pill ${statusColor}`}>{status}</p>
            </div>
        </div>
    );
}

export default CharacterCard;
