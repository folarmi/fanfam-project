import Image from "next/image";
import React from "react";

const SampleTable = ({ data }: any) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="border-b border-grey_10 pb-2">
          <tr>
            <th className="text-sm text-left text-grey_500 font-medium">
              Date
            </th>
            <th className="text-sm text-left text-grey_500 font-medium">
              Views
            </th>
            <th className="text-sm text-left text-grey_500 font-medium">
              Tips
            </th>
            <th className="text-sm text-left text-grey_500 font-medium">
              Price
            </th>
            <th className="text-sm text-left text-grey_500 font-medium">
              Purchases
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, index: any) => (
            <tr key={index}>
              <td className="p-4 border-b">
                {row.date}
                <div className="flex items-center mt-2">
                  <Image
                    src={row.image}
                    alt="Thumbnail"
                    className="w-10 h-10 object-cover mr-2"
                  />
                  <span>{row.text}</span>
                </div>
              </td>
              <td className="p-4 border-b">{row.views}</td>
              <td className="p-4 border-b">{row.tips}</td>
              <td className="p-4 border-b">{row.price}</td>
              <td className="p-4 border-b">{row.purchases}</td>
              {/* <td className="p-4 border-b">
                <a
                  href={row.statsLink}
                  className="text-blue-500 hover:underline"
                >
                  FULL STATS
                </a>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SampleTable;
