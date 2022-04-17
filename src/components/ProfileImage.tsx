import { Avatar, AvatarProps } from "@mui/material";
import { stringToAvatar } from "@local/functions";

interface ProfileImageProps {
    src?: string, 
    alt: string
};

export default function ProfileImage({ src, alt, ...rest }: ProfileImageProps & AvatarProps) {
    const colorAvatar = stringToAvatar(alt);
    
    const avatar = !src? ({
        alt: alt,
        sx: {
            bgColor: colorAvatar.color
        },
        children: colorAvatar.shortName
    }) : ({
        src: src,
        alt: alt
    });
    
    return <Avatar {...avatar} {...rest}/>;
};