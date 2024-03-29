import table from 'text-table';
import wcwidth from 'wcwidth';
import chalk from 'chalk';
import terminalLink from 'terminal-link';
import { Report } from './data';

// const genarateFormatReport = (reports: Report[]): string => {
//   const headerRow = [['状态', '页面', '相似度']];

//   const bodyRows = reports.map(report => {
//     const { isPass, diffImagePath, routePath, differences, dimension } = report;
//     const diffImageLink = terminalLink('link', `file://${diffImagePath}`);
//     const passText = isPass ? chalk.green('通过') : chalk.red('失败');
//     const percent = (dimension - differences) / dimension;
//     const percentString = `${(percent * 100).toFixed(2)}%`;
//     const row = [passText, routePath, percentString];
//     return row;
//   });

//   const config = {
//     columns: {
//       0: {
//         alignment: 'left',
//         width: 5
//       },
//       1: {
//         alignment: 'left',
//         width: 20
//       },
//       2: {
//         alignment: 'left',
//         width: 10
//       }
//       // 3: {
//       //   alignment: 'left',
//       //   width: 10
//       // }
//     }
//   };

//   const data = headerRow.concat(bodyRows);

//   return table(data, config);
// };

// const formatReport = (reports: Report[]) => {
//   console.log('状态', '页面', '相似度', '对比图');

//   reports.forEach(report => {
//     const { isPass, diffImagePath, routePath, differences, dimension } = report;
//     const diffImageLink = terminalLink('link', `file://${diffImagePath}`);
//     const passText = isPass ? chalk.green('通过') : chalk.red('失败');
//     const percent = (dimension - differences) / dimension;
//     const percentString = `${(percent * 100).toFixed(2)}%`;
//     console.log(passText, routePath, percentString, diffImageLink);
//   });
// };

const formatReport = (reports: Report[]) => {
  const headerRow = [[chalk.white('状态'), '页面', '相似度', '对比图']];

  const bodyRows = reports.map(report => {
    const { isPass, diffImagePath, routePath, differences, dimension } = report;
    const diffImageLink = terminalLink('link', `file://${diffImagePath}`);
    const passText = isPass ? chalk.green('通过') : chalk.red('失败');
    const percent = (dimension - differences) / dimension;
    const percentString = `${(percent * 100).toFixed(2)}%`;
    const row = [passText, routePath, percentString, diffImageLink];
    return row;
  });

  const passCount = reports.filter(report => report.isPass).length;

  console.log(`${chalk.green('通过')}: ${passCount}/${reports.length}`);
  console.log(`-------------------------------------`);

  console.log(
    table(headerRow.concat(bodyRows), {
      align: ['l', 'l', 'l', 'l'],
      stringLength: wcwidth
    })
  );
};

export { formatReport };
