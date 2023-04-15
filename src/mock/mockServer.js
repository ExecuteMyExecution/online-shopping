// 引入mockjs模块
import Mock from 'mockjs';
// 引入JSON数据格式【JSON数据并没有对外暴露，但是可以引入】
// 因为webpack默认对外暴露，比如图片、JSON
import banner from './banner.json';
import floor from './floor.json';

// mock数据
Mock.mock('/mock/banner', {code: 200, data: banner});
Mock.mock('/mock/floor', {code: 200, data: floor});
