// import * as Factory from 'factory.ts';
// import { faker } from '@faker-js/faker';
// // import { IComment } from './shared/interfaces/IComment';
// // import { IQuestion } from './shared/interfaces/IQuestion';
// // import { ITag } from './shared/interfaces/ITag';
// // import { IAnswer } from './shared/interfaces/IAnswer';

// // Users
// export const userFactory = Factory.Sync.makeFactory<IUser>({
//   id: Factory.each((i) => i),
//   name: Factory.each(() => faker.name.fullName()),
//   avatar: Factory.each(() => faker.image.avatar()),
//   questionsCount: Factory.each(() =>
//     faker.datatype.number({ min: 0, max: 100 })
//   ),
//   answersCount: Factory.each(() => faker.datatype.number({ min: 0, max: 100 })),
//   createdAt: Factory.each(() => faker.date.between('2023-01-01', '2023-03-31')),
//   updatedAt: Factory.each(() => faker.date.between('2023-01-01', '2023-03-31')),
// });

// // Tags
// export const tagFactory = Factory.Sync.makeFactory<ITag>({
//   id: Factory.each(() => faker.datatype.number()),
//   name: Factory.each(() => faker.lorem.word()),
//   description: Factory.each(() => faker.lorem.sentence()),
//   questionsCount: Factory.each(() => faker.datatype.number()),
//   createdAt: Factory.each(() => faker.date.between('2023-01-01', '2023-03-31')),
//   updatedAt: Factory.each(() => faker.date.between('2023-01-01', '2023-03-31')),
// });

// // Questions
// export const questionFactory = Factory.Sync.makeFactory<IQuestion>({
//   id: Factory.each((i) => i + 1),
//   title: Factory.each(() =>
//     faker.lorem.sentence(faker.datatype.number({ min: 7, max: 10 }))
//   ),
//   description: Factory.each(() => faker.lorem.paragraph(100)),
//   tags: Factory.each(() =>
//     tagFactory.buildList(faker.datatype.number({ min: 1, max: 5 }))
//   ),
//   user: Factory.each(() => userFactory.build()),
//   upvotes: Factory.each(() => faker.datatype.number({ min: 0, max: 50 })),
//   downvotes: Factory.each(() => faker.datatype.number({ min: 0, max: 50 })),
//   answersCount: Factory.each(() => faker.datatype.number({ min: 0, max: 20 }),),
//   updatedAt: Factory.each(() => faker.date.between('2023-01-01', '2023-03-31')),
//   createdAt: Factory.each(() => faker.date.between('2023-01-01', '2023-03-31')),
// });

// // Comments
// export const commentFactory = Factory.Sync.makeFactory<IComment>({
//   id: Factory.each(() => faker.datatype.number()),
//   text: Factory.each(() => faker.lorem.paragraph()),
//   user: Factory.each(() => userFactory.build()),
//   createdAt: Factory.each(() => faker.date.between('2023-01-01', '2023-03-31')),
//   updatedAt: Factory.each(() => faker.date.between('2023-01-01', '2023-03-31')),
// });

// // Answers
// export const answerFactory = Factory.Sync.makeFactory<IAnswer>({
//   id: Factory.each(() => faker.datatype.number()),
//   text: Factory.each(() => faker.lorem.paragraph(50)),
//   user: Factory.each(() => userFactory.build()),
//   isAccepted: Factory.each(() => faker.datatype.boolean()),
//   upvotes: Factory.each(() => faker.datatype.number({ min: 0, max: 50 })),
//   downvotes: Factory.each(() => faker.datatype.number({ min: 0, max: 50 })),
//   createdAt: Factory.each(() => faker.date.between('2023-01-01', '2023-03-31')),
//   updatedAt: Factory.each(() => faker.date.between('2023-01-01', '2023-03-31')),
// });
