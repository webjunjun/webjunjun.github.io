$(function() {

	var compareNum = '',
		tempNum = '',
		fNum = '',
		operat = '',
		sNum = '',
		result = '';

	$('.num-btn').off().on('click', function() {
		var curVal = $(this).html();
		var cal_top = $('.cal_top');
		if (cal_top.html().length >= 10) {
			return false;
		}
		compareNum = tempNum;
		if (compareNum.indexOf('-')>-1) {
			compareNum = compareNum.substring(1);
		}
		if (compareNum === '') {
			if (curVal === '.') {
				cal_top.html('0.');
				tempNum = '0.';
			} else {
				cal_top.html(curVal);
				tempNum = curVal;
			}
		} else if (compareNum === '0') {
			if (curVal === '0') {
				cal_top.html(tempNum);
				tempNum = tempNum;
			} else if (curVal === '.') {
				cal_top.html(tempNum + '.');
				tempNum = tempNum + '.';
			} else {
				cal_top.html(curVal);
				tempNum = curVal;
			}
		} else if (compareNum === '0.') {
			if (curVal !== '.') {
				cal_top.append(curVal);
				tempNum += curVal;
			}
		} else {
			if (curVal === '.') {
				if (cal_top.html().indexOf('.') < 0) {
					cal_top.append(curVal);
					tempNum += curVal;
				}
			} else {
				cal_top.append(curVal);
				tempNum += curVal;
			}
		}
	});

	$('.operat-btn').off().on('click', function() {
		var curOperat = $(this).html();
		if (fNum === '') {
			// 第一次按下运算符
			if (curOperat !== '=') {
				// 如果第一次按下的是非等号运算符
				fNum = tempNum;
				tempNum = '';
				operat = curOperat;
				if (fNum === '') {
					fNum = '0';
				}
			}
		} else {
			if (tempNum !== '') {
				// 不是连续按下运算符
				sNum = tempNum;
				tempNum = '';
				if (operat === '+') {
					result = numeral(parseFloat(fNum)).add(parseFloat(sNum));
				} else if (operat === '-') {
					result = numeral(parseFloat(fNum)).subtract(parseFloat(sNum));
				} else if (operat === '×') {
					result = numeral(parseFloat(fNum)).multiply(parseFloat(sNum));
				} else if (operat === '÷') {
					if (parseFloat(sNum) === 0) {
						sNum = 1;
					}
					result = numeral(parseFloat(fNum)).divide(parseFloat(sNum));
				}
				$('.cal_top').html(result._value);
				sNum = '';
				if (curOperat !== '=') {
					fNum = result._value;
					operat = curOperat;
				} else {
					fNum = '';
					operat = '';
				}
			} else {
				// 连续按下运算符
				if (curOperat !== '=') {
					operat = curOperat;
				}
			}
		}
	});

	$('.control-btn').off().on('click', function() {
		var curControl = $(this).html();
		if (curControl === 'C') {
			fNum = '';
			sNum = '';
			operat = '';
			tempNum = '';
			$('.cal_top').html('0');
		} else if (curControl === '+/-') {
			if ($('.cal_top').html().indexOf('-') > -1) {
				$('.cal_top').html($('.cal_top').html().substring(1));
			} else {
				$('.cal_top').html('-' + $('.cal_top').html());
			}
			tempNum = $('.cal_top').html();
		} else if (curControl === '%') {
			$('.cal_top').html((parseFloat($('.cal_top').html()) / 100));
			tempNum = $('.cal_top').html();
		}
	});
});
