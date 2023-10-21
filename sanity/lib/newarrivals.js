/* eslint-disable import/no-anonymous-default-export */
export default {
    name: "NewArrivals",
    title: "NewArrivals",
    type: "document",
    fields: [
      {
        name: "image01",
        type: "image",
        title: "Image01",
        Options: {
          hotspot: true,
        },
      },
      {
        name: "title",
        type: "string",
        title: "Title",
      },
      {
        name: "price",
        type: "number",
        title: "Price",
      },
      {
        name: "category",
        type: "string",
        title: "Category",
      },
    ],
  };
  