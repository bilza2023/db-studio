31-March-2025

# Preamble

### Alhamdulillah Success of Taleem.help

Very important day for me since my 3 years long project Taleem.help is in its last few days. Once this app starts production, then it is a matter of just maintenance and improvement.

> I can gladly say that Alhamdulillah, I have created an online power-point using which, Inshallah, I will be able to generate hours of content every day. This will, Inshallah, become a content generation machine.

## Next Mission: DB-Studio

<small>Since this mission is my second mission and I have Taleem.help experience, I will do this project the correct way.</small>

### Mission:

To create a database project which can become a base project for database and tooling related things. :

1.  **Managing Taleem Database**: related to Taleem.help, for example, making copies, backups, versioning, and upgrading of old formats.
2.  **Static Files**: I want to generate static files / data files / presentations for my Taleem.help content. A database (is needed for users / login) but for content, I need SQLite files and nothing more.
3.  **Data Tests for Presentations**: I can run different tests etc. on my presentations.
4.  **Image/Sound Management**: managing images and sound files -- system for adding and saving them.
5.  **General Tests for DB**: I can write tests (using TypeScript) for all my data so that I can check missing fields.

> One of the Main reason for this Project is that I need a very simple Database setup with known technologies (node and sqlite). The database is not hosted rather in file format. This will enable me to run Processes (any process / tests etc) on any Data.

*I have spent a lot of time on UI but the serious business is in backend and Database*

### Technologies

1. **Node.js** : Since i already know this and can make quick progress. I have very less time to can not switch to golang now. Moving to golang will take months plus I also have a backend in node already.
2. **sqlite** : I want all my db to be part of the project file that i can save on labtop and not in some database that can be erased. My experience with *docker* has taught me that online database is not backup and is only users.There is no need for a *docker container*, no need for docker *volumes*. Sqlite is even better than vanilla json.I have all the access to my json like data just like a database and yet there is not need for server.
3. **Typescript** : In my taleem.help project *Typescript was a life saver*. I MUSt add type safety to my database and database tests.
4. *Prisma*


> The basic technologies are node,sqlite and typescript