export function optimizeImageSrc(imageSrc) {
    return imageSrc.replace('width=750&format=jpeg&optimize=medium', 'format=webply&optimize=high');
}