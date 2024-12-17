import { Injectable } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaClient) { }
  // 根据学校获取所有院校信息
  async getAllSchool(school: string): Promise<any> {
    return this.prisma.getscore.findMany({
      where: {
        school: school,
      },
      select: {
        id: true,
        year: true,
        masterType: true,
        school: true,
        code: true,
        name: true,
        score: true,
        politics: true,
        english: true,
        lessonOne: true,
        lessonTwo: true,
        remarks: true,
        province: true,
        schoolType: true,
        schoolWebsite: true,
        schoolResearchWebsite: true,
        schoolPhone: true,
        schoolEmail: true,
        schoolAddress: true,
        belong: true,
        master: true,
        doctor: true,
        nationalKeySubject: true,
        keyLaboratory: true
      },
    });
  }

  async getAuthors(school: string): Promise<any> {
    return this.prisma.getnewexcel.findMany({
      where: {
        school: school,
      },
      select: {
        id: true,
        name: true,
        school: true,
        submit: true,
        infor: true
      },
    });
  }

  async getScores(school: string, code: string, year: string): Promise<any> {
    return this.prisma.getscore.findMany({
      where: {
        school: school,
        code: code,
        year: year
      },
      select: {
        school: true,
        code: true,
        id: true,
        year: true,
        masterType: true,
        name: true,
        score: true,
        politics: true,
        english: true,
        lessonOne: true,
        lessonTwo: true,
        remarks: true,
        province: true,
        schoolType: true,
        schoolWebsite: true,
        schoolResearchWebsite: true,
        schoolPhone: true,
        schoolEmail: true,
        schoolAddress: true,
        belong: true,
        master: true,
        doctor: true,
        nationalKeySubject: true,
        keyLaboratory: true
      },
    });
  }

  // 获取学校清单（去重）
  async getSchool(): Promise<any> {
    return this.prisma.getscore.findMany({
      distinct: ['school'],
      select: {
        school: true,
        code: true,
      },
    });
  }
}
