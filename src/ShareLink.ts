export default class ShareLink {

    public LINKEDIN : string;

    public TWITTER : string;

    public FACEBOOK : string;

    public EMAIL : string | undefined | null;

    public PINTEREST : string | undefined | null;

    constructor(url: string, title: string, text: string, mailRecipient: string | null | undefined, pinterestSrcImg: string | null | undefined){
        
        // eslint-disable-next-line no-debugger
        debugger;

        const safeText = encodeURIComponent(text);
        
        this.LINKEDIN = `http://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${safeText}`;
        this.TWITTER = `https://twitter.com/intent/tweet?text=${safeText}%0a${url}`;
        this.FACEBOOK=`https://www.facebook.com/sharer/sharer.php?u=${url}`;

        if(mailRecipient){
            this.EMAIL=`mailto:${mailRecipient}?&subject=${title}&body=${safeText}`;
        }

        if(pinterestSrcImg){
            this.PINTEREST=`https://pinterest.com/pin/create/button/?${url}&media=${pinterestSrcImg}&description=${title}`;
        }
    }
}