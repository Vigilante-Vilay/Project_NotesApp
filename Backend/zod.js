const zod = require("zod");

const userSigninSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

const userLoginSchema = zod.object({
    username: zod.string(),
    password: zod.string()
})

const NotesSchema = zod.object({
    title: zod.string(),
    content: zod.string().max(200).optional()
})

module.exports={
    userSigninSchema,
    userLoginSchema,
    NotesSchema
}