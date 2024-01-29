const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { hash, compare } = require("bcrypt");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;
    const [user] = await knex("users").where({ email });

    if(!name) throw new AppError("O nome é necessário"); 
    if(!email) throw new AppError("O E-mail é necessário"); 
    if(!password) throw new AppError("A senha é necessária");;

    const emailPattern = /^[w+-\.]+@[w+-\.]+[\w-]{2,4}$/; 

    if(!emailPattern.test(email)) {
      throw new AppError("O e-mail precisa ser um e-mail válido!");
    }


    if(user && user.email === email) {
      throw new AppError("Este e-mail já está em uso.")
    }

    const encryptedPassword = await hash(password, 8);
    
    await knex("users").insert({ name, email, password: encryptedPassword });

    return response.status(201).json({})
  }

  async update(request, response) {
    const { id, name, email, password, old_password } = request.body;

    const [user] = await knex("users").where({ id });

    if(!user) {
      throw new AppError("Usuário não existente");
    }


    if(email && user.email !== email) {
      if(!password) {
        throw new AppError("Para alterar o e-mail é necessária senha.")
      }
      
      const doesPasswordMatch = await compare(password, user.password);

      if(!doesPasswordMatch) {
        throw new AppError("Senha incorreta");
      }

      const [userWithNewEmail] = await knex("users").where({ email });

      if(userWithNewEmail) {
        throw new AppError("Este e-mail já está em uso");
      }

      user.email = email;
    }

    if(password && old_password) {
      const doesPasswordMatch = await compare(old_password, user.password);

      if(!doesPasswordMatch) {
        throw new AppError("Senha incorreta");
      }

      user.password = await hash(password, 8);
    }


    user.email = email ?? user.email;
    user.name = name ?? user.name;

    await knex("users").where({ id }).update({
      name: user.name,
      email: user.email,
      password: user.password
    });

    return response.status(204).json({})
  }

}

module.exports = UsersController;