package service;
import static org.mockito.Mockito.doReturn;

import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;

import project2.dao.DAOLayer;
import project2.model.User;
import project2.service.DAOServiceImpl;

public class DAOServiceImplJUnitTest {
	/**
     * Autowire in the service that we want to test
     */
    @Autowired
    private DAOServiceImpl service;

    /**
     * Create a mock implementation of the WidgetRepository
     */
    @Mock
    private DAOLayer dao;

    @Test
    @DisplayName("Test findByIdNotFound")
    void testFindByIdNotFound() {
        // Setup mock repository
       // doReturn(Optional.empty()).when(dao).getUserbyID(1);

        // Execute the service call
       // Optional<User> returnedUser = service.getUserbyID(1);

        // Assert the response
       // Assertions.assertFalse(returnedUser.isPresent(), "User should not be found");
    }


}

