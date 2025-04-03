import User from '../Entity/User'

export default interface UpsertUserServiceInterface {
   upsertUser(user: TNewUser): Promise<User>
}