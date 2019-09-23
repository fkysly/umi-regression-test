import { table } from 'table';
import chalk from 'chalk';
import terminalLink from 'terminal-link';
import { Report } from './data';

const genarateFormatReport = (reports: Report[]): string => {
  const headerRow = [['状态', '页面', '相似度']];

  const bodyRows = reports.map(report => {
    const { isPass, diffImagePath, routePath, differences, dimension } = report;
    const diffImageLink = terminalLink('link', `file://${diffImagePath}`);
    const passText = isPass ? chalk.green('通过') : chalk.red('失败');
    const percent = 1 - differences / dimension;
    const percentString = `${(percent * 100).toFixed(0)}%`;
    const row = [passText, routePath, percentString];
    return row;
  });

  const config = {
    columns: {
      0: {
        alignment: 'left',
        width: 5
      },
      1: {
        alignment: 'left',
        width: 20
      },
      2: {
        alignment: 'left',
        width: 5
      }
      // 3: {
      //   alignment: 'left',
      //   width: 10
      // }
    }
  };

  const data = headerRow.concat(bodyRows);

  return table(data, config);
};

export { genarateFormatReport };
