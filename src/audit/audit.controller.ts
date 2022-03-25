import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuditService } from './audit.service';
import { AuditDto } from './audit.dto';
import { Audit } from './audit.entity';

@Controller('audit')
export class AuditController {
  constructor(private auditService: AuditService) {}
  @Get('list/')
  getAuditList() {
    const auditList = this.auditService.findAll();
    return auditList;
  }
  @Post('create/')
  async createAudit(@Body() auditDto: AuditDto): Promise<string> {
    const audit = new Audit();
    audit.startDate = auditDto.startDate;
    audit.endDate = auditDto.endDate;
    audit.pdfInfo = auditDto.pdfInfo;
    await this.auditService.add(audit);
    return 'Audit is now saved on BD';
  }
}
