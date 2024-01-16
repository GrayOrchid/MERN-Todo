import Tasks from '../task/Tasks';

export default function Board({ title, listName, tasks, name, roomId }) {

    return (
        <div className="boards__board">
            <h1 className='boards__title'>{title}</h1>
            <Tasks listName={listName} name={name} todos={tasks} roomId={roomId} />
        </div>
    );
}
