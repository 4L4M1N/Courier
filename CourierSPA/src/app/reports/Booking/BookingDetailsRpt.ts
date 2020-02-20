import { BookingDetailsReport } from 'src/app/models/reportsFormat/BookingDetailsReport';

export class BookingDetailsRpt {
//   public static buildTableBody(BookingDetails, columns){
//     const body = [];
//     body.push(columns);
//     console.log(BookingDetails);
//     console.log('abc');
//     BookingDetails.forEach(function(row) {
//       var datarow = [];
//       columns.forEach(function(column) {
//         console.log(row[column]);
//         datarow.push(row[column].toString());
//       })

//       body.push(datarow);
//     });
//     return body;
// }
// public static table(data,colums) {
//   return {
//     table: {
//       headerRows: 1,
//       body: this.buildTableBody(data, colums)
//     }
//   };
// }
//     public static getDocumentDefinition(BookingDetails: BookingDetailsR[]) {
//         return {
//             content: [
//               {
//                 text: 'RESUME',
//                 bold: true,
//                 fontSize: 20,
//                 alignment: 'center',
//                 margin: [0, 0, 0, 20]
//               },
//               {
//                 text: 'Experience',
//                 style: 'header'
//               },
//               this.buildTableBody(BookingDetails,['BookingId','MerchantName',
//                                                   'ReceiverName', 'BookingDate', 'DeliveredDate',
//                                                 'Status','Zone','CourierBill', 'MerchantBill',
//                                               'ReceiverBill'])
//             ],
//             info: {
//               title: '_RESUME',
//               author: 'Name',
//               subject: 'RESUME',
//               keywords: 'RESUME, ONLINE RESUME',
//             },
//               styles: {
//                 header: {
//                   fontSize: 18,
//                   bold: true,
//                   margin: [0, 20, 0, 10],
//                   decoration: 'underline'
//                 },
//                 name: {
//                   fontSize: 16,
//                   bold: true
//                 },
//                 jobTitle: {
//                   fontSize: 14,
//                   bold: true,
//                   italics: true
//                 },
//                 sign: {
//                   margin: [0, 50, 0, 10],
//                   alignment: 'right',
//                   italics: true
//                 },
//                 tableHeader: {
//                   bold: true,
//                 }
//               }
//           };
//     }





public static table(data, columns) {
  return {
      table: {
          headerRows: 1,
          body: this.buildTableBody(data, columns)
      }, style: {
        fontSize: 9
      }
  };
}
public static buildTableBody(data: BookingDetailsReport[], columns) {
  var body = [];
  body.push(columns);

  data.forEach(function(row) {
      var dataRow = [];

      columns.forEach(function(column) {
          dataRow.push(row[column]);
      })

      body.push(dataRow);
  });

  return body;
}


  
   
}
