
class UserService{
    constructor(sequelize,user_model){
        this.sequelize = sequelize;
        this.user_model =user_model;
    }
    async store(data){
        try{
            //konek ke database
            await this.sequelize.authenticate();
            //migrate up
            await this.sequelize.sync();
        
    
            const result = await this.user_model.create({
                username:data.username,
                password:data.password,
                role:data.role,
            })
            return result;
        }catch(error){
            return error;
        }
    }

}
export default UserService;