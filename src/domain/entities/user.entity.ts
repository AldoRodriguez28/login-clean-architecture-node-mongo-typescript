export class UserEntity{
    constructor(
        public id:String,
        public name:String,
        public email:String,
        public password:String,
        public rol:String[],
        public img?:String,
    ){
        
    }
}