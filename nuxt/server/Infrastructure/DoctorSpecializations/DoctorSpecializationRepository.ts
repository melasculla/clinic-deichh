import { db } from '../Database/drizzle/client';
import type { DrizzleTransaction } from '../Database/drizzle/types';
import { eq, and, inArray } from 'drizzle-orm';
import { doctorSpecializationsTable } from '~~/config/schema';

export class DoctorSpecializationRepository {
  async updateAll(doctorId: number, specializationIds: number[]) {
    await db.transaction(async (tx) => {
        // Используйте db с with({ schema: tx }) вместо прямого доступа к tx
        const txDb = db.with({ schema: tx });
        
        await txDb.delete(doctorSpecializationsTable)
          .where(eq(doctorSpecializationsTable.doctorId, doctorId));
        
        if (specializationIds.length > 0) {
          await txDb.insert(doctorSpecializationsTable)
            .values(specializationIds.map(id => ({
              doctorId,
              specializationId: id
            })));
        }
      });
  }
}