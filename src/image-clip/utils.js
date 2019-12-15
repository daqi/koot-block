export function getLeftTop(want, screen, rect) {
    let { left, top } = want;
    const { width, height } = rect;

    const minLeft = 0;
    const minTop = 0;
    const maxLeft = screen.width - width;
    const maxTop = screen.height - height;

    // 限制在窗口范围内
    left = left < minLeft ? minLeft : left > maxLeft ? maxLeft : left;
    top = top < minTop ? minTop : top > maxTop ? maxTop : top;

    return { left, top };
}

export function getWidthHeight(want, screen, rect, min) {
    let { width, height } = want;

    const pwh = rect.width / rect.height;

    // 初始极值
    let maxW = screen.width - rect.left;
    let maxH = screen.height - rect.top;
    let minW = min.width;
    let minH = min.height;

    // 等比例的极值
    // 如果maxW有富余 maxW用maxH算出
    maxW = maxW / maxH > pwh ? maxH * pwh : maxW;
    // 如果图片w>h minW用minH算出
    minW = pwh > 1 ? minH * pwh : minW;

    // 对期望等比例控制
    // 如果期望width有富余 width用height算出
    width = width / height < pwh ? height * pwh : width;

    // 限制宽在极值内
    width = width < minW ? minW : width > maxW ? maxW : width;
    // 高度由宽度算出
    height = width / pwh;

    return { width, height };
}
