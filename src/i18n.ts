import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: {
                    nav: {
                        projects: 'Projects',
                        skills: 'Skills',
                        about: 'About Me',
                        contacts: 'Contacts',
                    },
                    hero: {
                        title: "I'm a <1>Software Engineer</1>",
                        desc: 'passionate about crafting clean, efficient, and user-focused web applications.',
                        button: 'Contact me!!',
                        caption: 'Currently working on <1>Portfolio</1>',
                    },
                    projects: {
                        title: 'projects',
                        chertnodes: { desc: 'Minecraft servers hosting' },
                        protectx: { desc: 'Discord bot antinuke' },
                        kahoot: { desc: 'Get answers to your kahoot quiz' },
                        live: 'Live',
                        cached: 'Cached',
                    },
                    contact: {
                        title: "Contacts",
                        desc: "I’m constantly exploring new technologies, improving my problem-solving skills, and collaborating with teams that value innovation and growth. Whether it’s developing with various tools, or diving into full-stack workflows, I bring a mix of creativity, curiosity, and precision to every project.",
                        form: {
                            name: "Name",
                            email: "Email",
                            message: "Message",
                            send: "Send Message",
                            sending: "Sending...",
                            success: "Message sent! I'll get back to you soon.",
                            error: "An error occurred. Please try again."
                        }
                    },
                    about: {
                        title: 'About Me',
                        experience: 'Experience',
                        present: 'Present',
                        certificate: 'Certificates',
                        button: 'View Credential',
                    },
                },
            },
            th: {
                translation: {
                    nav: {
                        projects: 'โปรเจกต์',
                        skills: 'ทักษะ',
                        about: 'เกี่ยวกับฉัน',
                        contacts: 'ติดต่อ',
                    },
                    hero: {
                        title: 'eM4aRKay — <1>วิศวกรซอฟต์แวร์</1>',
                        desc: 'ที่หลงใหลในการสร้างเว็บไซต์ที่มีประสิทธิภาพ สวยงาม และใช้งานง่าย',
                        button: 'ติดต่อฉันได้เลย!!',
                        caption: 'กำลังทำงานกับ <1>Portfolio</1>',
                    },
                    contact: {
                        title: "ติดต่อ",
                        desc: "ผมชอบเรียนรู้เทคโนโลยีใหม่ ๆ พัฒนาทักษะการแก้ปัญหา และทำงานร่วมกับทีมที่ให้ความสำคัญกับนวัตกรรม เพื่อสร้างผลงานที่ตอบโจทย์ผู้ใช้และมีคุณภาพสูงเสมอ ไม่ว่าจะเป็นการพัฒนาด้วย tools หรือการทำงานแบบ Full-stack ผมพร้อมทุ่มเทและพัฒนาอย่างต่อเนื่อง",
                        form: {
                            name: "ชื่อ",
                            email: "อีเมล",
                            message: "ข้อความ",
                            send: "ส่งข้อความ",
                            sending: "กำลังส่ง...",
                            success: "ส่งข้อความแล้ว! ฉันจะติดต่อกลับไปเร็วๆ นี้",
                            error: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง"
                        }
                    },
                    about: {
                        title: 'เกี่ยวกับฉัน',
                        experience: 'ประสบการณ์',
                        present: 'ปัจจุบัน',
                        certificate: 'ประกาศนียบัตร',
                        button: 'ดูประกาศนียบัตร',
                    },
                },
            },
        },
    });

export default i18n;