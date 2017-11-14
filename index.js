var Proto = require("./svga_pb")

function str2uint8array(str) {
    var buf = new ArrayBuffer(str.length); // 2 bytes for each char
    var bufView = new Uint8Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

class SVGAProtoHelper_1_5_0 {

    static convertToProto(obj) {
        const movieItem = new Proto.MovieEntity();
        movieItem.setVersion("1.5.0");
        const movieParams = new Proto.MovieParams();
        movieParams.setViewboxwidth(obj.movie.viewBox.width);
        movieParams.setViewboxheight(obj.movie.viewBox.height);
        movieParams.setFps(obj.movie.fps);
        movieParams.setFrames(obj.movie.frames);
        movieItem.setParams(movieParams);
        const imagesMap = movieItem.getImagesMap();
        for (const aKey in obj.images) {
            const aValue = obj.images[aKey];
            imagesMap.set(aKey, str2uint8array(aValue))
        }
        const spritesList = movieItem.getSpritesList()
        obj.sprites.forEach((sprite) => {
            const spriteItem = new Proto.SpriteEntity();
            spriteItem.setImagekey(sprite.imageKey);
            const framesList = spriteItem.getFramesList();
            sprite.frames.forEach((frame) => {
                const frameItem = new Proto.FrameEntity();
                if (typeof frame.alpha === "number") {
                    frameItem.setAlpha(frame.alpha || 1.0);
                }
                if (typeof frame.layout === "object") {
                    frameItem.setLayout(((frameLayout) => {
                        const layout = new Proto.Layout();
                        layout.setX(frameLayout.x)
                        layout.setY(frameLayout.y)
                        layout.setWidth(frameLayout.width)
                        layout.setHeight(frameLayout.height)
                        return layout
                    })(frame.layout))
                }
                if (typeof frame.transform === "object") {
                    frameItem.setTransform(((frameTransform) => {
                        const transform = new Proto.Transform();
                        transform.setA(frameTransform.a)
                        transform.setB(frameTransform.b)
                        transform.setC(frameTransform.c)
                        transform.setD(frameTransform.d)
                        transform.setTx(frameTransform.tx)
                        transform.setTy(frameTransform.ty)
                        return transform
                    })(frame.transform))
                }
                if (typeof frame.clipPath === "string") {
                    frameItem.setClippath(frame.clipPath)
                }
                if (typeof frame.shapes === "object") {
                    const shapesList = frameItem.getShapesList();
                    frame.shapes.forEach((shape) => {
                        const shapeItem = new Proto.ShapeEntity();
                        shapeItem.setType((() => {
                            if (shape.type === "shape") {
                                return Proto.ShapeEntity.ShapeType.SHAPE;
                            }
                            else if (shape.type === "rect") {
                                return Proto.ShapeEntity.ShapeType.RECT;
                            }
                            else if (shape.type === "ellipse") {
                                return Proto.ShapeEntity.ShapeType.ELLIPSE;
                            }
                            else if (shape.type === "keep") {
                                return Proto.ShapeEntity.ShapeType.KEEP;
                            }
                        })(shape.type));
                        if (typeof shape.args === "object") {
                            if (shape.type === "shape") {
                                const args = new Proto.ShapeEntity.ShapeArgs();
                                if (typeof shape.args.d === "string") {
                                    args.setD(shape.args.d)
                                }
                                shapeItem.setShape(args);
                            }
                            else if (shape.type === "rect") {
                                const args = new Proto.ShapeEntity.RectArgs();
                                if (typeof shape.args.x === "number") {
                                    args.setX(shape.args.x)
                                }
                                if (typeof shape.args.y === "number") {
                                    args.setY(shape.args.y)
                                }
                                if (typeof shape.args.width === "number") {
                                    args.setWidth(shape.args.width)
                                }
                                if (typeof shape.args.height === "number") {
                                    args.setHeight(shape.args.height)
                                }
                                if (typeof shape.args.cornerRadius === "number") {
                                    args.setCornerradius(shape.args.cornerRadius)
                                }
                                shapeItem.setRect(args);
                            }
                            else if (shape.type === "ellipse") {
                                const args = new Proto.ShapeEntity.EllipseArgs();
                                if (typeof shape.args.x === "number") {
                                    args.setX(shape.args.x)
                                }
                                if (typeof shape.args.y === "number") {
                                    args.setY(shape.args.y)
                                }
                                if (typeof shape.args.radiusX === "number") {
                                    args.setRadiusx(shape.args.radiusX)
                                }
                                if (typeof shape.args.radiusY === "number") {
                                    args.setRadiusy(shape.args.radiusY)
                                }
                                shapeItem.setEllipse(args);
                            }
                        }
                        if (typeof shape.styles === "object") {
                            const styleItem = new Proto.ShapeEntity.ShapeStyle();
                            if (typeof shape.styles.fill === "object") {
                                const color = new Proto.ShapeEntity.ShapeStyle.RGBAColor();
                                color.setR(shape.styles.fill[0]);
                                color.setG(shape.styles.fill[1]);
                                color.setB(shape.styles.fill[2]);
                                color.setA(shape.styles.fill[3]);
                                styleItem.setFill(color);
                            }
                            if (typeof shape.styles.stroke === "object") {
                                const color = new Proto.ShapeEntity.ShapeStyle.RGBAColor();
                                color.setR(shape.styles.stroke[0]);
                                color.setG(shape.styles.stroke[1]);
                                color.setB(shape.styles.stroke[2]);
                                color.setA(shape.styles.stroke[3]);
                                styleItem.setStroke(color);
                            }
                            if (typeof shape.styles.strokeWidth === "number") {
                                styleItem.setStrokewidth(shape.styles.strokeWidth)
                            }
                            if (typeof shape.styles.lineCap === "string") {
                                if (shape.styles.lineCap === "butt") {
                                    styleItem.setLinecap(Proto.ShapeEntity.ShapeStyle.LineCap.LINECAP_BUTT)
                                }
                                else if (shape.styles.lineCap === "round") {
                                    styleItem.setLinecap(Proto.ShapeEntity.ShapeStyle.LineCap.LINECAP_ROUND)
                                }
                                else if (shape.styles.lineCap === "square") {
                                    styleItem.setLinecap(Proto.ShapeEntity.ShapeStyle.LineCap.LINECAP_SQUARE)
                                }
                            }
                            if (typeof shape.styles.lineJoin === "string") {
                                if (shape.styles.lineJoin === "miter") {
                                    styleItem.setLinejoin(Proto.ShapeEntity.ShapeStyle.LineJoin.LINEJOIN_MITER)
                                }
                                else if (shape.styles.lineJoin === "round") {
                                    styleItem.setLinejoin(Proto.ShapeEntity.ShapeStyle.LineJoin.LINEJOIN_ROUND)
                                }
                                else if (shape.styles.lineJoin === "bevel") {
                                    styleItem.setLinejoin(Proto.ShapeEntity.ShapeStyle.LineJoin.LINEJOIN_BEVEL)
                                }
                            }
                            if (typeof shape.styles.miterLimit === "number") {
                                styleItem.setMiterlimit(shape.styles.miterLimit)
                            }
                            if (typeof shape.styles.lineDash === "object") {
                                if (typeof shape.styles.lineDash[0] === "number") {
                                    styleItem.setLinedashi(shape.styles.lineDash[0])
                                }
                                if (typeof shape.styles.lineDash[1] === "number") {
                                    styleItem.setLinedashii(shape.styles.lineDash[1])
                                }
                                if (typeof shape.styles.lineDash[2] === "number") {
                                    styleItem.setLinedashiii(shape.styles.lineDash[2])
                                }
                            }
                            shapeItem.setStyles(styleItem);
                        }
                        if (typeof shape.transform === "object") {
                            shapeItem.setTransform(((shapeTransform) => {
                                const transform = new Proto.Transform();
                                transform.setA(shapeTransform.a)
                                transform.setB(shapeTransform.b)
                                transform.setC(shapeTransform.c)
                                transform.setD(shapeTransform.d)
                                transform.setTx(shapeTransform.tx)
                                transform.setTy(shapeTransform.ty)
                                return transform
                            })(shape.transform))
                        }
                        shapesList.push(shapeItem);
                    })
                }
                framesList.push(frameItem);
            })
            spritesList.push(spriteItem);
        })
        return movieItem.serializeBinary()
    }

}

class SVGAProtoHelper_2_0_0 {

    static convertToProto(obj, fileMapping) {
        const movieItem = new Proto.MovieEntity();
        movieItem.setVersion("2.0.0");
        const movieParams = new Proto.MovieParams();
        movieParams.setViewboxwidth(obj.movie.viewBox.width);
        movieParams.setViewboxheight(obj.movie.viewBox.height);
        movieParams.setFps(obj.movie.fps);
        movieParams.setFrames(obj.movie.frames);
        movieItem.setParams(movieParams);
        const imagesMap = movieItem.getImagesMap();
        for (const aKey in obj.images) {
            if (typeof fileMapping[aKey] === "object") {
                imagesMap.set(aKey, fileMapping[aKey]);
            }
        }
        const spritesList = movieItem.getSpritesList()
        obj.sprites.forEach((sprite) => {
            const spriteItem = new Proto.SpriteEntity();
            spriteItem.setImagekey(sprite.imageKey);
            const framesList = spriteItem.getFramesList();
            sprite.frames.forEach((frame) => {
                const frameItem = new Proto.FrameEntity();
                if (typeof frame.alpha === "number") {
                    frameItem.setAlpha(frame.alpha || 1.0);
                }
                if (typeof frame.layout === "object") {
                    frameItem.setLayout(((frameLayout) => {
                        const layout = new Proto.Layout();
                        layout.setX(frameLayout.x)
                        layout.setY(frameLayout.y)
                        layout.setWidth(frameLayout.width)
                        layout.setHeight(frameLayout.height)
                        return layout
                    })(frame.layout))
                }
                if (typeof frame.transform === "object") {
                    frameItem.setTransform(((frameTransform) => {
                        const transform = new Proto.Transform();
                        transform.setA(frameTransform.a)
                        transform.setB(frameTransform.b)
                        transform.setC(frameTransform.c)
                        transform.setD(frameTransform.d)
                        transform.setTx(frameTransform.tx)
                        transform.setTy(frameTransform.ty)
                        return transform
                    })(frame.transform))
                }
                if (typeof frame.clipPath === "string") {
                    frameItem.setClippath(frame.clipPath)
                }
                if (typeof frame.shapes === "object") {
                    const shapesList = frameItem.getShapesList();
                    frame.shapes.forEach((shape) => {
                        const shapeItem = new Proto.ShapeEntity();
                        shapeItem.setType((() => {
                            if (shape.type === "shape") {
                                return Proto.ShapeEntity.ShapeType.SHAPE;
                            }
                            else if (shape.type === "rect") {
                                return Proto.ShapeEntity.ShapeType.RECT;
                            }
                            else if (shape.type === "ellipse") {
                                return Proto.ShapeEntity.ShapeType.ELLIPSE;
                            }
                            else if (shape.type === "keep") {
                                return Proto.ShapeEntity.ShapeType.KEEP;
                            }
                        })(shape.type));
                        if (typeof shape.args === "object") {
                            if (shape.type === "shape") {
                                const args = new Proto.ShapeEntity.ShapeArgs();
                                if (typeof shape.args.d === "string") {
                                    args.setD(shape.args.d)
                                }
                                shapeItem.setShape(args);
                            }
                            else if (shape.type === "rect") {
                                const args = new Proto.ShapeEntity.RectArgs();
                                if (typeof shape.args.x === "number") {
                                    args.setX(shape.args.x)
                                }
                                if (typeof shape.args.y === "number") {
                                    args.setY(shape.args.y)
                                }
                                if (typeof shape.args.width === "number") {
                                    args.setWidth(shape.args.width)
                                }
                                if (typeof shape.args.height === "number") {
                                    args.setHeight(shape.args.height)
                                }
                                if (typeof shape.args.cornerRadius === "number") {
                                    args.setCornerradius(shape.args.cornerRadius)
                                }
                                shapeItem.setRect(args);
                            }
                            else if (shape.type === "ellipse") {
                                const args = new Proto.ShapeEntity.EllipseArgs();
                                if (typeof shape.args.x === "number") {
                                    args.setX(shape.args.x)
                                }
                                if (typeof shape.args.y === "number") {
                                    args.setY(shape.args.y)
                                }
                                if (typeof shape.args.radiusX === "number") {
                                    args.setRadiusx(shape.args.radiusX)
                                }
                                if (typeof shape.args.radiusY === "number") {
                                    args.setRadiusy(shape.args.radiusY)
                                }
                                shapeItem.setEllipse(args);
                            }
                        }
                        if (typeof shape.styles === "object") {
                            const styleItem = new Proto.ShapeEntity.ShapeStyle();
                            if (typeof shape.styles.fill === "object") {
                                const color = new Proto.ShapeEntity.ShapeStyle.RGBAColor();
                                color.setR(shape.styles.fill[0]);
                                color.setG(shape.styles.fill[1]);
                                color.setB(shape.styles.fill[2]);
                                color.setA(shape.styles.fill[3]);
                                styleItem.setFill(color);
                            }
                            if (typeof shape.styles.stroke === "object") {
                                const color = new Proto.ShapeEntity.ShapeStyle.RGBAColor();
                                color.setR(shape.styles.stroke[0]);
                                color.setG(shape.styles.stroke[1]);
                                color.setB(shape.styles.stroke[2]);
                                color.setA(shape.styles.stroke[3]);
                                styleItem.setStroke(color);
                            }
                            if (typeof shape.styles.strokeWidth === "number") {
                                styleItem.setStrokewidth(shape.styles.strokeWidth)
                            }
                            if (typeof shape.styles.lineCap === "string") {
                                if (shape.styles.lineCap === "butt") {
                                    styleItem.setLinecap(Proto.ShapeEntity.ShapeStyle.LineCap.LINECAP_BUTT)
                                }
                                else if (shape.styles.lineCap === "round") {
                                    styleItem.setLinecap(Proto.ShapeEntity.ShapeStyle.LineCap.LINECAP_ROUND)
                                }
                                else if (shape.styles.lineCap === "square") {
                                    styleItem.setLinecap(Proto.ShapeEntity.ShapeStyle.LineCap.LINECAP_SQUARE)
                                }
                            }
                            if (typeof shape.styles.lineJoin === "string") {
                                if (shape.styles.lineJoin === "miter") {
                                    styleItem.setLinejoin(Proto.ShapeEntity.ShapeStyle.LineJoin.LineJoin_MITER)
                                }
                                else if (shape.styles.lineJoin === "round") {
                                    styleItem.setLinejoin(Proto.ShapeEntity.ShapeStyle.LineJoin.LineJoin_ROUND)
                                }
                                else if (shape.styles.lineJoin === "bevel") {
                                    styleItem.setLinejoin(Proto.ShapeEntity.ShapeStyle.LineJoin.LineJoin_BEVEL)
                                }
                            }
                            if (typeof shape.styles.miterLimit === "number") {
                                styleItem.setMiterlimit(shape.styles.miterLimit)
                            }
                            if (typeof shape.styles.lineDash === "object") {
                                if (typeof shape.styles.lineDash[0] === "number") {
                                    styleItem.setLinedashi(shape.styles.lineDash[0])
                                }
                                if (typeof shape.styles.lineDash[1] === "number") {
                                    styleItem.setLinedashii(shape.styles.lineDash[1])
                                }
                                if (typeof shape.styles.lineDash[2] === "number") {
                                    styleItem.setLinedashiii(shape.styles.lineDash[2])
                                }
                            }
                            shapeItem.setStyles(styleItem);
                        }
                        if (typeof shape.transform === "object") {
                            shapeItem.setTransform(((shapeTransform) => {
                                const transform = new Proto.Transform();
                                transform.setA(shapeTransform.a)
                                transform.setB(shapeTransform.b)
                                transform.setC(shapeTransform.c)
                                transform.setD(shapeTransform.d)
                                transform.setTx(shapeTransform.tx)
                                transform.setTy(shapeTransform.ty)
                                return transform
                            })(shape.transform))
                        }
                        shapesList.push(shapeItem);
                    })
                }
                framesList.push(frameItem);
            })
            spritesList.push(spriteItem);
        })
        return movieItem.serializeBinary()
    }

}

if (typeof window === "object") {
    window.SVGAProtoHelper_1_5_0 = SVGAProtoHelper_1_5_0;
    window.SVGAProtoHelper_2_0_0 = SVGAProtoHelper_2_0_0;
}

exports.SVGAProtoHelper_1_5_0 = SVGAProtoHelper_1_5_0;
exports.SVGAProtoHelper_2_0_0 = SVGAProtoHelper_2_0_0;