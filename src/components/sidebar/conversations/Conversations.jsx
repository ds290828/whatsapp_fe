import { useSelector } from 'react-redux';
import Conversation from './Conversation';

export default function Conversations() {
    const { conversations } = useSelector((state) => state.chat);
    // useEffect(() => {
    //     console.log('conversations:', conversations);
    //     console.log('Type of conversations:', typeof conversations);
    //     console.log('Is conversations an array?', Array.isArray(conversations));
    // }, [conversations]);
    return (
        <div className="convos scrollbar">
            <ul>
                {conversations && conversations.map((convo) => (
                    <Conversation convo={convo} key={convo._id} />
                ))}
            </ul>
        </div>
    );
};
