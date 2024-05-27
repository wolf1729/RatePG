import HeaderComponent from "../components/header"
import { Stack, Accordion, AccordionButton, AccordionItem, AccordionPanel, AccordionIcon, Box } from '@chakra-ui/react'

function FAQScreen() {
    return (
        <>
        <HeaderComponent newEntryPage={true}/>
        <Stack display='flex' flexDir='column'>
            <Accordion defaultIndex={[0]} allowMultiple>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as='span' flex='1' textAlign='left'>
                                What is this website about?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        This website is a comprehensive platform for finding 
                        and rating Paying Guest (PG) accommodations. Users can 
                        search for PGs based on their preferences, read reviews, 
                        and view ratings provided by other users.       
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                    <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                            Do I need to create an account to use the website?
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Yes, creating an account allows you to save your favorite PGs, 
                        leave reviews, and rate accommodations. However, you can browse 
                        the listings without an account.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                    <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                            How are the PGs rated on your website?
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        PGs are rated based on various criteria including room quality, 
                        cleanliness, location, and overall experience. Users can leave 
                        ratings and detailed reviews after their stay.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                    <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                            Can I leave a review for a PG I have stayed in?
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Yes, after logging into your account, you can leave a review and rate 
                        the PG you have stayed in. Your feedback will help other users make 
                        informed decisions.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                    <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                            How is my personal information protected?
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        We take your privacy seriously and use advanced security measures to protect 
                        your personal information. Please refer to our Privacy Policy for more details.
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                    <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                            Are there any additional fees for using your website?
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        No, using our website to search for and rate PG accommodations is completely free. 
                        However, the PGs may have their own charges for accommodation.
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Stack>
        </>
    )
}

export default FAQScreen