import moment from "moment";
import { dateHandler } from './../../../utils/date';

export default function Conversation({ convo }) {
  // console.log(moment(convo.latestMessage.createdAt).fromNow());
  return (
    <li className="list-none h-[72px] w-full dark:bg-dark_bg_1 hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10px]">
      {/* container */}
      <div className="relative w-full flex items-center justify-between py-[10px]">
        {/* left */}
        <div className="flex items-center gap-x-3">
          { /*Converastion user picture */}
          <div className="relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden">
            <img
              src={convo.picture}
              alt={convo.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* conversation name and message */}
          <div className="w-full flex flex-col ">
            {/* conversation name */}
            <h1 className="font-bold flex items-center gap-x-2">{convo.name}</h1>
            {/* conversation message */}
            <div>
              <div className="flex items-center gap-x-1 dark:text-dark_text_3">
                <div className="flex-1 items-center gap-x-1 dark:text-dark_text_3">
                  <p>{convo.latestMessage?.message}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
        {/* right */}
        <div className="flex flex-col gap-y-4 items-end text-xs">
          <span className="dark:text-dark_text_3">
            {dateHandler(convo.latestMessage.createdAt)}  
          </span>
          {/* <span className="dark:text-dark_text_3">
           { moment(convo.latestMessage.createdAt).fromNow(true)}
          </span> */}
        </div>
      </div>
      {/* border */}
      <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
    </li>
  )
}
