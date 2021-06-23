export class Video{
    constructor(thumbnail, createrPic, duration, title,creater, viewsCount, uploadedTime){
        this.thumbnail = thumbnail;
        this.createrPic = createrPic;
        this.duration = this.toMinSecs(duration);
        this.title = title;
        this.viewsCount = this.toUnitViews(viewsCount);
        this.uploadedTime = this.toTimeAgo(uploadedTime);
        this.creater = creater;
    }

    toMinSecs(duration){
        let string = duration;
        string = string.substring(2,string.length-1);
        string = string.replace(/h|m/gi, ':');
        return string;
    }

    toTimeAgo(time){

        let date = new Date(time);
        let present = Date.now();
        let millis = present - date.getTime();
        let secs = Math.floor(millis/1000)%60;
        let mins = Math.floor(millis/60000)%60;
        let hrs = Math.floor(millis/3600000)%24;
        let days = Math.floor((millis)/(1000*3600*24));
        let months = Math.floor(days/30);
        let years = Math.floor(months/12);
        let str;

        if(days<1){
            if(hrs>=1){
                str = `${hrs} hours ago`;
                if(hrs === 1){
                    str=`${hrs} hour ago`;
                }
            }
            else if(hrs<1){
                if(min>=1){
                    str = `${mins} minutes ago`;
                    if(mins === 1){
                        str=`${mins} minute ago`;
                    }
                }
                else if(mins<1){
                    str = `${secs} seconds ago`;
                    if(secs === 1){
                        str=`${secs} second ago`;
                    }
                }
            }
        }
        else if(days>=1){
            if(months>=1){
                if(years >=1){
                    str = `${years} years ago`;
                    if(years === 1){
                        str=`${years} year ago`;
                    }
                }
                else if(years<1){
                    str = `${months} months ago`;
                    if(months === 1){
                        str=`${months} month ago`;
                    }
                }
            }
            else if(months<1){
                str=`${days} days ago`;
                if(days === 1){
                    str=`${days} day ago`;
                }
            }
        }

        return str;
    }

    toUnitViews(count){
        count = +count;
        let str;
        let billions = count/1000000000;
        let millions = count/1000000;
        let ks = count/1000;
        if(count>=1000){
            if(billions>=1){
                if(billions>=10){
                    str = `${Math.floor(billions)}B`;
                }
                else if(billions<10){
                    str = `${billions.toFixed(1)}B`;
                }
            }
            else if(billions<1){
                if(millions>=10){
                    str = `${Math.floor(millions)}M`;
                }
                else if(millions<10){
                    str = `${millions.toFixed(1)}M`;
                    if(millions<1){
                        if(ks>=10){
                            str = `${Math.floor(ks)}K`;
                        }
                        else if(ks<10){
                            str = `${ks.toFixed(1)}K`;
                        }
                    }
                }
            }
        }

        str += ' views';
        return str;
    }
} 