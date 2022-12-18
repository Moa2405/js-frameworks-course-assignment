import Image from "next/image";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from "next/link";

export const ProductCard = ({ id, name, image, alt }) => {
    return (
        <Link href={`/detail/${id}`}>
            <Card
                sx={{ maxWidth: 345, cursor: "pointer" }}
                key={id}
                xs={2} sm={4} md={4}
            >
                <Image
                    src={image}
                    alt={alt}
                    height={197}
                    width={350}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
}