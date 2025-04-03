import User from '../Entity/User'

export default interface GetUserByServiceInterface {
   getUserBy(
      by: 'email' | 'id',
      emailOrID: number | string
   ): Promise<User>
}