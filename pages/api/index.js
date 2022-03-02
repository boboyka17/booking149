// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const obj = {
  year: [
    {
      yearTitle: "1999",
      month: [
        {
          monthTitle: "3",
          days: [
            {
              daysTitle: "1",
            },
            {
              daysTitle: "2",
            },
            {
              daysTitle: "3",
            },
            {
              daysTitle: "4",
            },
          ],
        },
        {
          monthTitle: "4",
          days: [
            {
              daysTitle: "1",
            },
            {
              daysTitle: "2",
            },
            {
              daysTitle: "3",
            },
          ],
        },
      ],
    },
  ],
};
export default function handler(req, res) {
  res.status(200).json(obj);
}
