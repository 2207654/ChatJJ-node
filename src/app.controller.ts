import { Controller, Get, Param, Put } from '@nestjs/common';
import { AppService } from './app.service';


@Controller('search')
export class AppController {
  constructor(private readonly appService: AppService) { }


  @Get("school")
  async getSchool(): Promise<any> {
    return this.appService.getSchool();
  }


  @Get("allSchool/:school")
  async getAllSchool(@Param('school') school: string): Promise<any> {
    return this.appService.getAllSchool(school);
  }

  @Get(':school')
  async getAuthors(@Param('school') school: string): Promise<any> {
    return this.appService.getAuthors(school);
  }

  @Get(':school/:code/:year')
  async getScores(@Param('school') school: string, @Param('code') code: string, @Param('year') year: string): Promise<any> {

    return this.appService.getScores(school, code, year);
  }
}
