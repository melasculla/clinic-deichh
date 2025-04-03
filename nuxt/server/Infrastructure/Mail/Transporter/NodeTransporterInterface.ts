import { Mail } from '~~/server/Domain/Mail/Entity/Mail'

export default interface NodeTransporterInterface {
   send(letter: Mail): Promise<void>
}