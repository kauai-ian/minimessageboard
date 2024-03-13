// Enables users to compose and submit new messages

import { useState } from "react";
import {Message, MessageProps} from "./Message";

export type MessageFormProps = {

}

const MessageForm = ({addItem}) => {
const [newItem, setNewItem] = useState("")
const handleSubmit = (e) => {
    e.preventDefault();
    if(newItem === "") return
    addItem(newItem)
    setNewItem("")
}

    return (
        <>

        </>
    )
}