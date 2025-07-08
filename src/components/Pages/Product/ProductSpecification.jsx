import React from "react";
import {
    Table,
    Box,
    Typography,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    useMediaQuery,
    styled,
} from "@mui/material";
import { PSBox,PSTableCell } from "../../../Styles/ProductSpecification";


export const ProductSpecification = ({ description = [] }) => {

    const mobilescreen = useMediaQuery('(max-width:450px)');

    return (
        <Box sx={{ padding: '15px' }}>
            <PSBox>
                <Box sx={{ padding: "15px 5px 20px 0" }}>
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", paddingBottom: "10px" }}
                    >
                        Product Specifications
                    </Typography>
                    <TableContainer sx={{
                        width: mobilescreen ? "100%" : "40%",
                        overflow: "hidden"
                    }}>
                        <Table aria-label="product specification table">
                            <TableBody>
                                {description.map((item, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            borderBottom: "1px solid #e3dfdf",
                                            "&:last-child td": { borderBottom: 0 },
                                        }}
                                    >
                                        <PSTableCell>{item.name}</PSTableCell>
                                        <TableCell
                                            align="left"
                                            sx={{ fontSize: "14px", padding: "10px 10px", width: 300 }}
                                        >
                                            {item.value}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </PSBox>
        </Box>
    );
};
