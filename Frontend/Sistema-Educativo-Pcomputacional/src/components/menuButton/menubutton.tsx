import './menubutton.css';


interface MenuButtonProps {
  imageUrl: string;
  onClick: () => void; 
}

export default function MenuButton({  imageUrl , onClick }: MenuButtonProps) {
  return (
    <button className="menu-button">
        <img src={imageUrl}  className="button-image" onClick={onClick}/>
    </button>
  );
}