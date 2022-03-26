import { Controller, Post, Body } from '@nestjs/common';
import { ProjectService } from './project.service';
import { SeedplotDto } from '../seedplot/seedplot.dto';
import { Project } from './project.entity';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}
  
  @Post('create/')
  async createProject(@Body() seedplotDto: SeedplotDto): Promise<string> {
    const project = new Project();
    project.plot = seedplotDto.plot;
    project.seed = seedplotDto.seed;
    await this.projectService.add(project);
    return 'project has been saved';
  }
}