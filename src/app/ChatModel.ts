export class ChatModel
{
    user : string;
    message : string;

    constructor(user,message)
    {
        this.user = user;
        this.message = message;
    }
}