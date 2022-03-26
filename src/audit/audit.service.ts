import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Audit } from './audit.entity';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(Audit)
    private auditRepository: Repository<Audit>,
  ) {}

  findAll(): Promise<Audit[]> {
    return this.auditRepository.find();
  }

  findOne(id: number): Promise<Audit> {
    return this.auditRepository.findOne(id);
  }

  async add(audit: Audit): Promise<void> {
    await this.auditRepository.save(audit);
  }
}
