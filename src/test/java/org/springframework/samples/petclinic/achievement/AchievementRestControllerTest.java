package org.springframework.samples.petclinic.achievement;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.FilterType;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.MediaType;
import org.springframework.samples.petclinic.match.MatchService;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.security.config.annotation.web.WebSecurityConfigurer;
import org.springframework.security.test.context.support.WithMockUser;

@WebMvcTest(value = AchievementController.class, excludeFilters = @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = WebSecurityConfigurer.class))
class AchievementRestControllerTest {

    private static final String BASE_URL = "/api/v1/achievements";

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AchievementService achievementService;

    @MockBean
    private MatchService matchService;

    @Autowired
    private ObjectMapper objectMapper;

    private Achievement achievement;


    @BeforeEach
    void setup() {
        achievement = new Achievement();
        achievement.setId(1);
        achievement.setName("First match");
        achievement.setThreshold(Threshold.GAMESPLAYED);
        achievement.setMetric(1);
    }

    @Test
    @WithMockUser("admin")
    void testFindAllAchievements() throws Exception {
        List<Achievement> achievements = Arrays.asList(achievement);
        when(achievementService.findAll()).thenReturn(achievements);

        mockMvc.perform(get(BASE_URL))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].name").value("First match"));
    }

    @Test
    @WithMockUser("admin")
    void testFindAchievementById() throws Exception {
        when(achievementService.findAchievementById(1)).thenReturn(achievement);

        mockMvc.perform(get(BASE_URL + "/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("First match"));
    }

    @Test
    @WithMockUser("admin")
    void testCreateAchievement() throws Exception {

        Achievement achievement2 = new Achievement();
        achievement2.setName("Prueba");
        achievement2.setMetric(1);
        achievement2.setThreshold(Threshold.TOTALPLAYTIME);

        mockMvc.perform(post(BASE_URL)
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(achievement2)))
                .andExpect(status().isCreated());
    }

    @Test
    @WithMockUser("admin")
    void testUpdateAchievement() throws Exception {
        achievement.setName("First Win");
        when(achievementService.findAchievementById(1)).thenReturn(achievement);
        when(achievementService.updateAchievement(any(Achievement.class),any(Integer.class))).thenReturn(achievement);

        mockMvc.perform(put(BASE_URL + "/{id}",1)
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(achievement)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("First Win"));
    }

    @Test
    @WithMockUser("admin")
    void testDeleteAchievement() throws Exception {
        doNothing().when(achievementService).deleteAchievement(1);

        mockMvc.perform(delete(BASE_URL + "/1").with(csrf()))
                .andExpect(status().isNoContent());
    }

    @Test
    @WithMockUser("admin")
    void testAchievementSuccess() throws Exception {
        when(achievementService.Success(1, 1)).thenReturn(true);

        mockMvc.perform(get(BASE_URL + "/1/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(true));
    }
}
