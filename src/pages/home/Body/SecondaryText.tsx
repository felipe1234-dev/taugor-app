import { Box, Chip, Typography } from "@mui/material";

import { useOnMobile } from "@local/hooks";
import { ProfileImage } from "@local/components";
import { User, Task } from "@local/interfaces";

interface SecondaryTextProps {
    user: User,
    poster: User,
    task: Task,
    date: string
}

export default function SecondaryText({ user, poster, task, date }: SecondaryTextProps) {
    const isMobile = useOnMobile("md");
    
    return (
        <>
            <Typography
                component="span"
                variant="body2"
                sx={{
                    display: "block",
                    mb: "1em !important"
                }}
            >
                {task.brief}
            </Typography>
            <Box
                component="div"
                sx={{
                    display: "flex",
                    flexDirection: !isMobile ? "row" : "column",
                    justifyContent: "flex-start",
                    alignItems: !isMobile ? "center" : "flex-start"
                }}
            >
                <Chip
                    label={poster.uuid === user.uuid ? "Você" : poster.displayName}
                    component="span"
                    avatar={(
                        <ProfileImage
                            src={poster.photoURL}
                            alt={poster.displayName}
                        />
                    )}
                />
                {task.tags.map((tag, i) => (
                    <Chip
                        key={i}
                        component="span"
                        label={tag}
                    />
                ))}
                {date}
            </Box>
        </>
    );
}